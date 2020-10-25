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

const mapStateToProps = state => {
  return{
    dishes : state.dishes,
    comments : state.comments,
    promotions : state.promotions,
    leaders : state.leaders
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
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
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
        />
      )
    }


    const DishWithId = (props) => {
      return (
        <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId, 10))}
        />
      )
    }

    return (
      <div>
        <Header />
        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}/>
          <DishDetails dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]}/>*/}
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route exact path="/contactus" component={Contact} />
          <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>


        <Footer />

      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps)(Main));

