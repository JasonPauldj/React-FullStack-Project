import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent.'
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetails from './DishDetailsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent copy';
import About from './AboutUs';
import {connect} from 'react-redux';
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
  return{
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  }
}

const mapDispatchToProps =(dispatch)=> ({
      postFeedback : (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
      postComment : ( dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
      fetchDishes : ()=> {dispatch(fetchDishes())},
      resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
      fetchComments : ()=> {dispatch(fetchComments())},
      fetchPromos : ()=> {dispatch(fetchPromos())},
      fetchLeaders : () => {dispatch(fetchLeaders())}
    })


class Main extends Component {

  constructor(props) {
    super(props);
  }

componentDidMount()
{
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  this.props.fetchLeaders();
}
  /* onDishSelect(dishId)
   {
       this.setState({
           selectedDish:dishId
       });
   }*/

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading  = {this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leaderLoading ={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
        />
      )
    }


    const DishWithId = (props) => {
      return (
        <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId, 10))[0]}
         isLoading ={this.props.dishes.isLoading}
         errMess ={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId, 10))}
        commentsErrMess={this.props.comments.errMess}  
        postComment={this.props.postComment}
        />
      )
    }

    return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
          <DishDetails dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/>*/}
          <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route path="/aboutus" component={() => <About leaders={this.props.leaders.leaders} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>
        </CSSTransition>
        </TransitionGroup>

        <Footer />

      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

