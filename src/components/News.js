import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {

    constructor() {
        super();
        console.log("Hello I am a constructor from News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,

        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=un&apiKey=4177873bda764b678adcea6b0603159b&page=1&pageSize=${this.props.pageSize}`;
        {this.setState({loading: true})};
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
    }

    handlePreviousClick=async()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=un&apiKey=4177873bda764b678adcea6b0603159b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        {this.setState({loading: true})};
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        })
    }

    handleNextClick = async () => {
        console.log("Next");
        if(! this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            let url = `https://newsapi.org/v2/top-headlines?country=un&apiKey=4177873bda764b678adcea6b0603159b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            {this.setState({loading: true})};
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            })
        }
    }

    render() {
        return (
            <div className='container my-5'>
                <h1 className="text-center my-4">NewsMonkey - Top headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-5 mx-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title} description={element.description?element.description.slice(0, 88):""} newsUrl={element.url} imgUrl={element.urlToImage} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" id='NextClick' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
