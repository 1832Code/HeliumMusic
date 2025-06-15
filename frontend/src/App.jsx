import { Route, Routes, Link } from "react-router-dom";
import { NavBar } from "./routes/Components/NavBar";
import { Inicio } from "./routes/Inicio";
import { Artistas } from "./routes/Artistas";
import { Descubrir } from "./routes/Descubrir";
import { Albums } from "./routes/Albums";
import { Favoritos } from "./routes/Favoritos";
import { Login } from "./routes/auth/Login";
import { Register } from "./routes/auth/Register";
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-800">
      <div className="flex bg-gray-900 w-full">
        <header className=" bg-blue-600 p-10 h-screen overflow-auto ">
          <NavBar />
        </header>
        <main className="w-[100%] bg-emerald-500 p-10 overflow-auto">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/artistas" element={<Artistas />} />
            <Route path="/descubrir" element={<Descubrir />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
