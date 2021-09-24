import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#66FF99',
    borderRadius: '25px',
    p: 4,
};

const DetailAnime = createContext();

export default function Anime() {
    const [anime, setAnime] = useState([]);
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3001/anime",
            headers: {
                accept: "*/*",
            },
        })

            .then((data) => {
                setAnime(data.data);
            })

            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div style={{ marginTop: 20 }}>

            <h1 style={{ textAlign: "center" }}>Daftar Anime</h1>

            <Grid container md={11} spacing={4} style={{ marginTop: "50px", marginLeft: "auto", marginRight: "auto" }}>
                {anime.map((results) => {
                    return (
                        <Grid item key={results.judul} md={3}>
                            <Card>
                                <CardActionArea onClick={() => { setOpen(true); setJudul(results.judul); setDeskripsi(results.deskripsi) }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={results.img_src}
                                    />
                                    <CardContent style={{ backgroundColor: '#66FF99' }}>
                                        <Typography variant="h6" style={{ color: 'white',
                                    textShadowColor: 'rgba(0, 0, 0, 0)',
                                    textShadowOffset: '{width: -1, height: 1}',
                                    textShadowRadius: '10'
                                   }}>{results.judul}</Typography>
                                        <Typography variant="h6" style={{ color: 'white' }}>Rating: {results.rating}​​​​​​</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <DetailAnime.Provider value={{ judul: judul, deskripsi: deskripsi }}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-anime"
                        aria-describedby="modal-modal-deskripsi"
                    >
                        <Detail />
                    </Modal>
                </div>
            </DetailAnime.Provider>
        </div >
    );
}

function Detail() {
    const info = useContext(DetailAnime);
    return (
        <Box sx={style}>
            <Typography id="modal-modal-anime" variant="h6" component="h2">
                {info.judul}
            </Typography>
            <Typography id="modal-modal-deskripsi" sx={{ mt: 1 }}>
                Perusahaan: {info.deskripsi.produksi}
            </Typography>
            <Typography id="modal-modal-deskripsi" sx={{ mt: 1 }}>
                Sinopsis: {info.deskripsi.sinopsis}
            </Typography>
        </Box>
    );
}