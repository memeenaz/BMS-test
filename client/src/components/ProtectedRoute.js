import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { setUser } from '../redux/userSlice';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { message, Layout, Menu, theme } from 'antd';
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const ProtectedRoute = ({children}) => {
    const { user } = useSelector((state) => state.user);
    // const [current, setCurrent] = useState('mail');
    // const onClick = (e) => {
    //     console.log('click ', e);
    //     setCurrent(e.key);
    // };

    let navItems = [
        {
          label: <Link to="/">Home</Link>,
          key: 'home',
          icon: <HomeOutlined/>
        },
        // {
        //   label: 'Movies',
        //   key: 'movies',
        //   icon: <VideoCameraOutlined/>
        // },
        {
          label: `${user ? user.name : 'User'}`,
          key: 'SubMenu',
          icon: <UserOutlined/>,
          children: [           
            {
                label: <span onClick={() => { user.isAdmin ? navigate('/admin') : navigate('/profile') }}> My Profile</span>,
                key: 'myprofile',
                icon: <ProfileOutlined/>
            },
            {
                label: <Link onClick={ ()=> { localStorage.removeItem('token'); window.location.href = '/'; } }>Logout</Link>,
                key: 'logout',
                icon: <LogoutOutlined/>
            }
          ],
        }
    ];

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getPresentUser = async () => {
        try{
            dispatch(showLoading);
            const response = await GetCurrentUser();
            dispatch(hideLoading);

            if(response.success){
                dispatch(setUser(response.data));
            }else{
                dispatch(setUser(null));
                message.error(response.message);
                localStorage.removeItem('token');
                navigate('/login');
            }
        }catch(err){
            dispatch(hideLoading);
            dispatch(setUser(null))
            message.error(err.message);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getPresentUser();
            if(user){
                navItems[2].label = user.name;
            }
        }else{
            navigate("/login");
        }
    }, []);

    return(
        user && 
        <>
        <Layout>
            <Header className='d-flex justify-content-between' style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <h3 className="demo-logo text-white m-0"><Link style={{color: "#fff"}} to="/">BookMyShow</Link></h3>
                <Menu theme="dark" mode="horizontal" items={navItems} />
            </Header>
            <Content className="site-layout">
                <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>{ children }</div>
            </Content>
            <Footer className='fs-12' style={{ textAlign: 'center' }}>BookMyShow ©2024 Created by Minhaz Qureshi</Footer>
        </Layout>
        </>
    );
}

export default ProtectedRoute;