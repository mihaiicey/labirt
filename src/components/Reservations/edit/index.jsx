import { useParams, NavLink } from "react-router-dom";
export default function EditReservationCl() {
    const { reservationId } = useParams();

    return(
        <div className="container px-5 md:mx-auto mt-12">
        <h1 className="text-xl sm:text-3xl font-semibold pb-1 border-b-2 border-b-primary">
       Editare Rezervare - {reservationId}
        </h1>
    </div>
    )
}