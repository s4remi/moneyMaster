export default function App() {
  //basic test to see of we can get data from the back
  async function testBack() {
    console.log("Testing back...");
    const response = await fetch("/api/data");
    const data = await response.json();
    console.log("in APP.jsx, got data from back-end!\n ", data);
  }

  testBack();

  return (
    <div className="App">
      <header>
        <h1>Hello World</h1>
      </header>
    </div>
  );
}
