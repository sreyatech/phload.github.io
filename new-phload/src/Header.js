import React from 'react'
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom'


const Header = () => {

const user = JSON.parse(localStorage.getItem('user_info'))
const history = useHistory();

function logout(){
    localStorage.clear();
    window.location.reload();
history.push('/');
}

return (
<>
    <div>
        <Navbar bg="dark" variant="dark" className="fixed-top">
            <Container>
                <Navbar.Brand className="logo"><Link to="/" style={{
                    'textDecoration' : 'none',
                    'color' : 'white',
                }}>Phload</Link></Navbar.Brand>
                <Nav className="me-auto nav_bar_wrapper">
                    {
                    localStorage.getItem("user_info")?
                    <>
                        <Link to="/" className="link">Gallary</Link>
                        <Link to="/addimage" className="link">Add Image</Link>
                        <Link to="/updateimage" className="link">Update Image</Link>
                        <Link to="/api" className="link">Api</Link>

                    </>
                    :
                    <>
                        <Link to="/login" className="link">Login</Link>
                        <Link to="/register" className="link">Registration</Link>
                    </>
                    }

                </Nav>
                { localStorage.getItem("user_info")?
                <Nav>
                    <NavDropdown title={user && user.data.user.name}>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        {/* <NavDropdown.Item>Profile</NavDropdown.Item> */}

                    </NavDropdown>
                </Nav>
                : null
                }

            </Container>
        </Navbar>

    </div>
</>
)
}

export default Header