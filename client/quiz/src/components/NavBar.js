
const NavBar = ({switchPage})=>{
    return (
        <>
            <button className="delete-button" onClick={() => switchPage('list')}>List</button>
            <button className="delete-button" onClick={() => switchPage('quiz')}>Quiz</button>
            <button className="delete-button" onClick={()=>{ switchPage('creator')}}>Creator</button>
        </>
    )
}
export default NavBar