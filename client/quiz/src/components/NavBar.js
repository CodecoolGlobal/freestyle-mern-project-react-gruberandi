
const NavBar = ({switchPage})=>{
    return (
        <div>
            <button onClick={() => switchPage('list')}>List</button>
            <button onClick={() => switchPage('quiz')}>Quiz</button>
        </div>
    )
}
export default NavBar