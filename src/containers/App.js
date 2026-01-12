import { Component } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll";
import Pagination from "../components/pagination";
import { paginate } from "../data/paginate";
import {
  getFiltered,
  populate,
  getDeepFiltered,
  addPost,
} from "./../data/posts";
import Header from "../components/header/Header";
import PostsList from "../components/post/PostsList";

import AddPost from "./AddPost";
import "./App.css";
import SearchPost from "./SearchPost";

class App extends Component {
  state = {
    posts: [],
    allPosts: [], // Keep original posts separate
    showSearch: false,
    showAddPost: false,
    currentPage: 1,
    pageSize: 9,
    activeCategory: 'All',
    loading: true,
    searchResultsCount: 0,
  };

  componentDidMount() {
    this.initializePosts();
  }

  initializePosts = () => {
    this.setState({ loading: true });
    
    try {
      const { allPosts, count } = populate();
      this.allPosts = allPosts;
      this.count = count;

      this.setState({
        posts: allPosts,
        allPosts: allPosts, // Store original posts
        loading: false,
        searchResultsCount: allPosts.length,
        currentPage: 1,
      });

      toast.success(`${count} posts loaded successfully!`);
    } catch (error) {
      this.setState({ loading: false });
      toast.error('Failed to load posts. Please try again.');
      console.error('Error loading posts:', error);
    }
  };

  handleShowSearch = () => {
    this.setState(prevState => ({
      showSearch: !prevState.showSearch,
      showAddPost: false,
    }));
  };

  handleAddPost = () => {
    this.setState(prevState => ({
      showSearch: false,
      showAddPost: !prevState.showAddPost,
    }));
  };

  handleOnItemSelect = (category) => {
    let filteredPosts;
    
    if (category === 'All') {
      filteredPosts = this.allPosts;
    } else {
      filteredPosts = getFiltered(category);
    }

    this.setState({
      posts: filteredPosts,
      currentPage: 1,
      activeCategory: category,
      searchResultsCount: filteredPosts.length,
    });

    toast.info(`${category} posts loaded (${filteredPosts.length} items)`);
  };

  handleSearch = (searchObj) => {
    const filteredPosts = getDeepFiltered(searchObj);
    
    this.setState({
      posts: filteredPosts,
      currentPage: 1,
      showSearch: false,
      searchResultsCount: filteredPosts.length,
    });

    if (filteredPosts.length === 0) {
      toast.warning('No posts found matching your search criteria.');
    } else {
      toast.success(`Found ${filteredPosts.length} posts matching your search.`);
    }
  };

  handleClearSearch = () => {
    this.setState({
      posts: this.allPosts,
      currentPage: 1,
      activeCategory: 'All',
      searchResultsCount: this.allPosts.length,
    });
    
    toast.info('Search cleared. Showing all posts.');
  };

  handleAdd = (postData) => {
    try {
      const updatedPosts = addPost(postData);
      
      // Update both current posts and all posts
      this.allPosts = updatedPosts;
      
      this.setState({
        posts: updatedPosts,
        allPosts: updatedPosts,
        showAddPost: false,
        searchResultsCount: updatedPosts.length,
        currentPage: 1,
      });

      toast.success('Post added successfully! 🎉');
    } catch (error) {
      toast.error('Failed to add post. Please try again.');
      console.error('Error adding post:', error);
    }
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
    
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  renderContent() {
    const { posts, currentPage, pageSize, loading, searchResultsCount } = this.state;
    
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading posts...</p>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="no-posts-container">
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <h3>No posts found</h3>
            <p>Try changing your search criteria or add a new post!</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={this.handleClearSearch}
            >
              Clear Search
            </button>
          </div>
        </div>
      );
    }

    const paginated = paginate(posts, currentPage, pageSize);

    return (
      <>
        {/* Results Summary */}
        <div className="results-summary mb-4">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">
                  {this.state.activeCategory === 'All' 
                    ? 'All Posts' 
                    : `${this.state.activeCategory} Posts`}
                </h5>
                <small className="text-muted">
                  Showing {paginated.length} of {searchResultsCount} posts
                </small>
              </div>
              {this.state.activeCategory !== 'All' && (
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => this.handleOnItemSelect('All')}
                >
                  Show All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pagination - Top */}
        <div className="container">
          <Pagination
            itemsCount={posts.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>

        {/* Posts List */}
        <PostsList posts={paginated} />

        {/* Pagination - Bottom */}
        {posts.length > pageSize && (
          <div className="container mt-5">
            <Pagination
              itemsCount={posts.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </>
    );
  }

  render() {
    const { showSearch, showAddPost, activeCategory } = this.state;

    return (
      <div className="app-container">
        {/* Toast Notifications */}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* Header */}
        <Header
          setShowSearch={this.handleShowSearch}
          setAddPost={this.handleAddPost}
          onCatClick={this.handleOnItemSelect}
          activeCategory={activeCategory}
        />

        {/* Main Content */}
        <main className="main-content">
          {/* Add Post Modal */}
          <AddPost
            trigger={showAddPost}
            addButtonClick={this.handleAdd}
            onClose={this.handleAddPost}
          />

          {/* Search Modal */}
          <SearchPost
            trigger={showSearch}
            onSearchClick={this.handleSearch}
            onClose={this.handleShowSearch}
          />

          {/* Scrollable Content with Error Boundary */}
          <Scroll>
            <ErrorBoundry>
              <div className="container py-4">
                {this.renderContent()}
              </div>
            </ErrorBoundry>
          </Scroll>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="container">
            <p className="mb-0">
              © {new Date().getFullYear()} Country Charm. Discover hidden gems around the world.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;