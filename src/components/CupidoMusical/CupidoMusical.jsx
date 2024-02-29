import { useEffect, useState } from "react"
import useArtistas from "../../../api/useArtistas"
import './cupidoMusical.css'
import usePlaylist from "../../../api/usePlaylist"
import Header from "../Header/Header"
import Playlist from "../Playlist/Playlist"

import likeIcon from '/like.svg'
import crossIcon from '/cross.svg'


export default function CupidoMusical() {


    const [verCupidoMusical, setVerCupidoMusical] = useState("ver")
    const [verPlaylist, setVerPlaylist] = useState("noVer")

    const { verArtistas, listaArtistas } = useArtistas()
    const { cupidoMusical, playlist } = usePlaylist()

    const [listaID, setListaID] = useState([])


    function recuperarID(artistaID) {
        setListaID([...listaID, artistaID])
    }

    useEffect(() => {
        verArtistas()
    }, [])

    function crearPlaylist() {
        cupidoMusical(listaID)
        setVerPlaylist("ver")
        setVerCupidoMusical("noVer")
    }

    return (
        <>
            <div className={verCupidoMusical}>
                <Header titulo="Cupido Musical" />

                {listaArtistas.map((artista) => (
                    <div key={artista.id} className="tarjeta">
                        <img src={artista.imagen} alt={artista.nombre} className="artista-img"/>
                        <p>{artista.nombre}</p>
                        <div className="botones">
                            <button onClick={() => recuperarID(artista.id)} className="likeButton">
                                <img src={likeIcon} alt="Like" />
                            </button>
                            <button className="crossButton">
                                <img src={crossIcon} alt="Cross" />
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={crearPlaylist}>Crear Playlist</button>
            </div>

            <div className={verPlaylist}>
                <Playlist playlist={playlist} />
            </div>
        </>
    )
}