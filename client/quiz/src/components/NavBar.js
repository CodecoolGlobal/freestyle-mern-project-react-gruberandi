
const NavBar = ({switchPage})=>{
    return (
        <div>
            <button className="delete-button" onClick={() => switchPage('list')}>List</button>
            <button className="delete-button" onClick={() => switchPage('quiz')}>Quiz</button>
        </div>
    )
}
export default NavBar