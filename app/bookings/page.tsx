import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import BookingItem from "../_components/booking-item"
import { Dialog, DialogTrigger } from "../_components/ui/dialog"
import { Button } from "../_components/ui/button"
import { DialogContent } from "@radix-ui/react-dialog"
import { LogInIcon } from "lucide-react"
import SignInDialog from "../_components/sign-in-dialog"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-5">
        <h2 className="mb-2 font-bold">Faça login para ver os agendamentos!</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <LogInIcon />
              Fazer login
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <SignInDialog />
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
