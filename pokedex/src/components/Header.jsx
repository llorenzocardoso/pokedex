import { Link } from "react-router-dom";
import Logo from "../assets/img/logo-pokemon.svg";

const Header = () => {

    return (
        <header className="bg-yellow-500 shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">

                <div className="flex items-center">
                    <Link
                        to="/"
                    >
                        <img src={Logo} alt="Pokémon Logo" className="h-10" />

                    </Link>
                </div>

                <nav className="flex space-x-8 text-black  font-bold">
                    <Link
                        to="/"
                        className="hover:underline underline-offset-4 decoration-2 decoration-black"
                    >
                        Home
                    </Link>
                    <Link
                        to="/pokedex"
                        className="hover:underline underline-offset-4 decoration-2 decoration-black"
                    >
                        Pokédex
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;