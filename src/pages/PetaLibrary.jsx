import { useEffect, useState } from "react";
import {
  AiOutlineUpload,
  AiOutlineLogout,
} from "react-icons/ai";
import Swal from "sweetalert2";

import { useMediaQuery } from "react-responsive";
import TablePetaLibrary from "../component/PetaLibrary/TablePetaLibrary";
import BackHome from "../component/Permohonan/BackHome";
import { PetaService } from "../service/peta";
import { AuthService } from "../service/login";
import UploadPeta from "../component/Form/UploadPeta";

function PetaLibrary() {
  const [daftarPetaAwal, setDaftarPetaAwal] = useState(false);
  const [daftarPeta, setDaftarPeta] = useState([]);
  const [login, setLogin] = useState(false);
  const [berubah, setBerubah] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 800px)",
  });

  const fetchPeta = async () => {
    const data = await PetaService.getMany()
    setDaftarPetaAwal(data);
    setDaftarPeta(data);
  }

  useEffect(() => {
    fetchPeta()
  }, [berubah]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setLogin(true);
    }
  }, []);

  const cariPeta = (text) => {
    var filtered = daftarPetaAwal.filter(function (data) {
      return data["nama"].toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
    setDaftarPeta(filtered);
  };

  const onDeleteEvent = async (idFile) => {
    try {
      await PetaService.deleteFile(idFile)
      Swal.fire("Deleted!", "Delete File Success", "success");
      setBerubah(!berubah);
    } catch (err) {
      Swal.fire("Deleted!", "Failed Delete File", "error");

    }
  }

  const logOut = () => {
    AuthService.logout()
    localStorage.removeItem("authToken")
    localStorage.removeItem('refreshToken');
    setLogin(false);
  };

  return (
    <div className="h-screen bg-[#F9FAFE] lg:py-5 lg:px-10">
      <div className="py-3 px-3 text-black flex items-center justify-between font-medium ">
        <BackHome />
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
            <div
              className="flex h-full text-sm items-center cursor-pointer rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-1 mr-2 text-white"
              onClick={() => AuthService.ssoLogin()}
            >
              Login
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
        <TablePetaLibrary data={daftarPeta} onDeleteEvent={onDeleteEvent} />
      </div>
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
