import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Menu from "./MenuComponent";
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreator';
import {actions} from 'react-redux-form';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())}
});

class Main extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){

    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
            promotions={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]} dishesLoading={this.props.dishes.isLoading} dishErrMess={this.props.dishes.errMess} promosLoading={this.props.promotions.isLoading} promosErrMess={this.props.promotions.errMess} />
        )
    }

    const DishWithId = ({match}) => {
        return (
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} addComment={this.props.addComment} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess} commentsErrMess={this.props.comments.errMess}
            />
        )
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));