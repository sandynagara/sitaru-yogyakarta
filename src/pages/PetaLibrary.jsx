import React, { useEffect, useState } from "react";
import {
  AiFillInfoCircle,
  AiFillDelete,
  AiFillEye,
  AiOutlineDownload,
  AiOutlineHome,
  AiOutlineUpload,
  AiOutlineLogout,
} from "react-icons/ai";
import Swal from "sweetalert2";

import { useMediaQuery } from "react-responsive";
import LoginForm from "../component/LoginRegister/LoginForm";
import UploadPeta from "../component/Form/UploadPeta";
import { Link } from "react-router-dom";

function PetaLibrary() {
  const [daftarPetaAwal, setDaftarPetaAwal] = useState(false);
  const [daftarPeta, setDaftarPeta] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [berubah, setBerubah] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 800px)",
  });

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/` + "peta";
    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((respond) => respond.json())
      .then((hasil) => {
        setDaftarPetaAwal(hasil);
        setDaftarPeta(hasil);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [berubah]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_URL}/` + "user/check";

    fetch(url, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {        
        if (res != "unauthorized") {
          setLogin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const downloadFile = (idFile, nama = "No name") => {
    var url = `${process.env.REACT_APP_BASE_URL}/` + "peta/" + idFile;
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        var data = new Blob([res], { type: "application/pdf" });
        var csvURL = window.URL.createObjectURL(data);
        var tempLink = document.createElement("a");
        tempLink.href = csvURL;
        tempLink.setAttribute("download", `${nama}.pdf`);
        tempLink.click();
      });
  };

  const deleteFile = (idFile) => {
    Swal.fire({
      title: "Apa anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        var url = `${process.env.REACT_APP_BASE_URL}/` + "peta/" + idFile;
        fetch(url, {
          method: "DELETE",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            if (res["RTN"]) {
              Swal.fire("Deleted!", res["MSG"], "success");
              setBerubah(!berubah);
            } else {
              Swal.fire("Deleted!", res["MSG"], "error");
            }
          });
      }
    });
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const cariPeta = (text) => {
    var filtered = daftarPetaAwal.filter(function (data) {
      return data["nama"].toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
    setDaftarPeta(filtered);
  };

  const infoMobileEvent = (data) => {
    Swal.fire({
      title: "<strong>Info</u></strong>",
      icon: "info",
      html: `<div>
          <div>Tanggal : ${data["tanggal"]}  </div> 
          <div>Ukuran : ${formatBytes(data["ukuran"])}  </div>
        </div>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Close!',
    });
  };

  const openPdf = (data) => {
    var url = `${process.env.REACT_APP_BASE_URL}/` + "peta/" + data["namaId"];
    var w = window.open("", "_blank");
    if (w.document) {
      w.document.write(
        "<html><head><title>" +
          data["nama"] +
          '</title></head><body style="margin:0px;overflow:"hidden"><iframe src="' +
          url +
          '" height="100%" width="100%"></iframe></body></html>'
      );
    }
  };

  const ItemPeta = ({ data }) => {
    return (
      <div className="flex w-full text-black lg:py-3 px-3 border-b-2 border-gray-300 hover:bg-gray-200 bg-white border-solid items-center justify-between lg:grid lg:grid-cols-6">
        <div
          className="w-full  py-3 lg:py-0 lg:px-0 lg:col-span-3"
          onClick={() => {
            var url = `${process.env.REACT_APP_BASE_URL}/` + "peta/" + data["namaId"];
            if (!isDesktopOrLaptop) {
              openPdf(data);
            }
          }}
        >
          {data["nama"]}
        </div>

        {isDesktopOrLaptop && <div>{data["tanggal"]} </div>}
        {isDesktopOrLaptop && <div> {formatBytes(data["ukuran"])} </div>}
        {isDesktopOrLaptop && (
          <div className="flex">
            <AiFillEye
              size={23}
              className="mr-2 text-slate-600 cursor-pointer"
              onClick={() => openPdf(data)}
            />
            <AiOutlineDownload
              size={23}
              onClick={() => downloadFile(data["namaId"], data["nama"])}
              className="cursor-pointer mr-2"
            />
            {login && (
              <AiFillDelete
                size={23}
                color="red"
                onClick={() => deleteFile(data["namaId"])}
                className="cursor-pointer"
              />
            )}
          </div>
        )}

        {!isDesktopOrLaptop && (
          <AiFillInfoCircle
            size={25}
            color="gray"
            className="cursor-pointer"
            onClick={() => {
              infoMobileEvent(data);
            }}
          />
        )}
      </div>
    );
  };

  const logOut = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/` + "logout";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res["RTN"]) {
          setLogin(false);
        }
      });
  };

  return (
    <div className="h-screen bg-gray-300 lg:py-5 lg:px-10">
      <div className="py-3 px-3 text-black flex items-center justify-between font-medium ">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center bg-white px-3 rounded-md h-full">
              <AiOutlineHome
                size={19}
                className="text-black py-1 w-9 h-8  cursor-pointer rounded-full"
              />
              Home
            </div>
          </Link>
        </div>
        <div className="flex">
          {isDesktopOrLaptop && (
            <input
              className=" px-3 py-2 mx-2 rounded-lg   text-sm"
              placeholder="Cari Peta"
              onChange={(e) => cariPeta(e.target.value)}
            />
          )}
          {login ? (
            <div className="flex text-white">
              <div
                className="flex text-sm items-center cursor-pointer rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-1 mr-2"
                onClick={() => setUploadOpen(true)}
              >
                {isDesktopOrLaptop ? (
                  "Upload Data"
                ) : (
                  <AiOutlineUpload size={20} />
                )}
              </div>
              <div
                className="flex text-sm items-center cursor-pointer bg-red-600 hover:bg-red-700 rounded-md px-5 py-1"
                onClick={() => {
                  logOut();
                }}
              >
                {isDesktopOrLaptop ? "Logout" : <AiOutlineLogout size={20} />}
              </div>
            </div>
          ) : (
            <div>
              <div
                className="flex h-full text-sm items-center cursor-pointer rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-1 mr-2 text-white"
                onClick={() => setOpen(true)}
              >
                Login
              </div>
            </div>
          )}
        </div>
      </div>
      {!isDesktopOrLaptop && (
        <div className="w-full flex flex-col">
          <input
            className=" p-2 mb-2 mx-2 rounded-md"
            placeholder="Cari Peta"
            onChange={(e) => cariPeta(e.target.value)}
          />
        </div>
      )}
      <div className=" rounded-lg bg-white text-black mx-2">
        <div className="py-3 px-3 font-semibold text-xl border-b-2 border-solid border-black lg:border-b-0">
          Library Peta
        </div>
        {isDesktopOrLaptop && (
          <div className="py-2 px-3  lg:grid lg:grid-cols-6 font-medium border-b-2 border-solid border-black">
            <div className="col-span-3">Nama Peta</div>
            <div>Tanggal diunggah</div>
            <div>Ukuran</div>
            <div>Action</div>
          </div>
        )}
        <div className="bg-white max-h-[calc(100vh_-_180px)] lg:max-h-[calc(100vh_-_200px)]  overflow-y-scroll scroll">
          {daftarPeta &&
            daftarPeta.map((data, index) => {
              return <ItemPeta data={data} key={index} />;
            })}
        </div>
      </div>
      <LoginForm setOpen={setOpen} setLogin={setLogin} open={open} />
      {uploadOpen && (
        <UploadPeta
          setUploadOpen={setUploadOpen}
          setBerubah={setBerubah}
          berubah={berubah}
        />
      )}
    </div>
  );
}

export default PetaLibrary;
