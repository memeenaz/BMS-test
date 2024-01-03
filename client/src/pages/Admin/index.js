import { Tabs } from 'antd';
import MovieList from './MovieList';
import TheatresTable from './TheatresTable';
import PageTitle from '../../components/PageTitle';

const Admin = () => {
    const onChange = (key) => {
        console.log(key);
      };
      const items = [
        {
          key: '1',
          label: 'Movies',
          children: <MovieList/>,
        },
        {
          key: '2',
          label: 'Theatres',
          children: <TheatresTable/>,
        },
        // {
        //   key: '3',
        //   label: 'Tab 3',
        //   children: 'Content of Tab Pane 3',
        // },
      ];

    return (
        <>
            <PageTitle title="Welcome to Admin panel!"/>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
    )
}

export default Admin;