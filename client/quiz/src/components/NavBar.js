
const NavBar = ({switchPage})=>{
    return (
        <>
            <button onClick={() => switchPage('list')}>List</button>
            <button onClick={() => switchPage('quiz')}>Quiz</button>
            <button onClick={()=>{ switchPage('creator')}}>Creator</button>
        </>
    )
}
export default NavBar