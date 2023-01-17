import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

//** this.props => props
//** this.state => "None"

// export class News extends Component {
const News = (props) => {

    // static defaultProps = {
    //     country: 'in',
    //     pageSize: 8,
    //     category: 'general',
    // }

    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // constructor(props) {
    //     super(props);
    //     console.log("Hello I am a constructor from News component");
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0,
    //     }
    // }


    // async componentDidMount() {
    useEffect(()=>{
        document.title = `${capatilizeLetter(props.category)} -- NewsMonkey`;
        updateNews();
    }, []);

    // async updateNews() {
    const updateNews = async () =>{
        //** this.props => props
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // { this.setState({ loading: true }) };
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        // });
        props.setProgress(100);
    }

    
    const fetchMoreData = async() => {
        // this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        // { this.setState({ loading: true }) };
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        // this.setState({
        //     articles: this.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
    };

    const capatilizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // handlePreviousClick = async () => {
    ////     this.setState({ page: this.state.page - 1 })
    //     setPage(page-1)
    //     updateNews();
    // }

    // handleNextClick = async () => {
    ////     this.setState({ page: this.state.page + 1 })
    //     setPage(page+1)
    //     updateNews();
    // }

    // render() {
        return (
            <div className='container my-5'>
                <h1 className="text-center" style={{marginTop: '70px' ,}}>NewsMonkey -- Top {capatilizeLetter(props.category)} Headlines</h1>
                {/* {this.state.loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >

                    <div className="row my-5 mx-4">
                        {/* {!this.state.loading && this.state.articles.map((element) => { */}
                        {articles.map((element, index) => {
                            return <div key={index} className="col-md-4">
                                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    // }
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News