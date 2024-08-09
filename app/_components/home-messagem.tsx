"use client"

import { useSession } from "next-auth/react"

const HomeMessage = () => {
  const { data } = useSession()

  const date = new Date()
  const day = new Date().getDate()
  const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ]
  let weekday = weekdays[date.getDay()]
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]
  let month = months[date.getMonth()]

  return (
    <>
      {data?.user ? (
        <>
          <h2 className="text-xl font-bold">Olá, {data.user.name}!</h2>
          <p>
            {weekday}, {day} de {month}.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">Olá, faça seu login!</h2>
          <p>
            {weekday}, {day} de {month}.
          </p>
        </>
      )}
    </>
  )
}

export default HomeMessage
