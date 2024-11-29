import Logo from "../assets/img/logo-pokemon.svg";

const Header = () => {
  return (
    <header className="bg-yellow-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Pokémon Logo" className="h-10" />
        </div>

        <nav className="flex space-x-8 text-black  font-bold">
          <a
            href="#home"
            className="hover:underline underline-offset-4 decoration-2 decoration-black"
          >
            Home
          </a>
          <a
            href="#pokedex"
            className="hover:underline underline-offset-4 decoration-2 decoration-black"
          >
            Pokédex
          </a>
          <a
            href="#legendaries"
            className="hover:underline underline-offset-4 decoration-2 decoration-black"
          >
            Legendaries
          </a>
          <a
            href="#documentation"
            className="hover:underline underline-offset-4 decoration-2 decoration-black"
          >
            Documentation
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;