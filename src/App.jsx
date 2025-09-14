import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Project from "./components/Project";

function App() {
  return (
    <PageLoader>
      {({ onHeroReady, onNavbarReady }) => (
        <main className="relative w-screen min-h-screen overflow-x-hidden">
          <NavBar onReady={onNavbarReady} />
          <Hero onReady={onHeroReady} />
          <About />
          <Project />
          <Footer />
        </main>
      )}
    </PageLoader>
  );
}

export default App;
