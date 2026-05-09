import './App.css'
import CandidateList from './components/CandidateList/CandidateList'

function App() {
  const appStyle = {
    backgroundColor: "#020617", // Nền tối sâu (Slate-950)
    backgroundImage: `
      radial-gradient(circle at 0% 0%, rgba(79, 70, 229, 0.15) 0%, transparent 25%), 
      radial-gradient(circle at 100% 100%, rgba(124, 58, 237, 0.1) 0%, transparent 25%)
    `,
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <div style={appStyle}>
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <CandidateList />
      </div>
    </div>
  );
}
export default App
