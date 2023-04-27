import './App.css';
import Counter from './components/Counter';
import PostsList from './components/PostsList'
import AddPostForm from './components/AddPostForm';
import SinglePostPage from './components/singlePostPage';
import EditPostForm from './components/EditPostForm';
import Layout from './components/Layout';
import { Routes , Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />}/>
        <Route path="post">
          <Route  index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage  />} />
        <Route path="edit/:postId" element={<EditPostForm />}/>
        </Route>
      </Route>
    </Routes>
    // <div className="App">
    //   {/* <Counter /> */}
    //   <AddPostForm />
    //   <PostsList />
    // </div>
  );
}

export default App;
