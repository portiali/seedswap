import b from "./book.png";
function SeedBank() {
    return (
      <div className="SeedBank">
        <header className="App-header">
          <p class="text-lg italic">Seed Bank</p>
          <img src={b} className="books" alt="book" />
          
        </header>
      </div>
    );
  }
  
  export default SeedBank;