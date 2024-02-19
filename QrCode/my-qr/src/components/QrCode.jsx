import { useState } from "react";
export const QrCode = () => {
    const [img,setImg] = useState("")
    const [loading,setLoading] = useState(false);
    const [qrdata,setQrdata] = useState("http://localhost:5173/")
    const [qrsize,setQrsize] = useState("150")
    async function GenerateQr(){
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url);
        }
        catch(error){
            console.error("Error Generating QR Code",error);
        }
        finally{
            setLoading(false);
        }
        
    }
    function DownloadQr(){
        fetch(img)
        .then((response) => response.blob())
        .then((blob)=>{
            const links = document.createElement("a");
            links.href=URL.createObjectURL(blob);
            links.download="Qr-Code.png";
            document.body.appendChild(links);
            links.click();
            document.body.removeChild(links);
        }).catch((error)=>console.error("Error in Downloading QrCode",error))
    }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p> }
        {img && <img src={img} className="qr-code-image"/>}
        <div>
            <label htmlFor="DataInput" className="input-label">Data For QR Code: </label>
            <input type="text" id="DataInput" value={qrdata} placeholder="Paste Url" onChange={(e)=> setQrdata(e.target.value)}/>
            <label htmlFor="SizeInput" className="input-label">Image Size (e.g., 150): </label>
            <input type="text" id="SizeInput" value={qrsize} placeholder="Enter Size" onChange={(e)=>setQrsize(e.target.value)}/>
            <button className="generate-button" disabled={loading} onClick={GenerateQr}>Generate</button>
            <button className="download-button" onClick={DownloadQr} >Download</button>
        </div>
    </div>
  );
};
