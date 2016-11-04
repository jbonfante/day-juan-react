import React, { Component } from 'react';
import Client from './Client';
import { Table, InputGroup, InputGroupAddon } from 'reactstrap';
import { Card, CardBlock, CardGroup,
    CardTitle, Container} from 'reactstrap';
import LayoutContent from './layout/Content';
import {Pie, Bar} from 'react-chartjs-2';
import './UIComponents.scss';

class FoodApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFoods: [],
    };
  }
  render() {
    return (
      <div className='FoodApi'>
        <LayoutContent>
          <SelectedFoodPieChart
            foods={this.state.selectedFoods}
          />
        <Container className="UIComponent glossy">
          <SelectedFood

            foods={this.state.selectedFoods}
            onFoodRemove={
              (idx) => (
                this.setState({
                  selectedFoods: [
                    ...this.state.selectedFoods.slice(0, idx),
                    ...this.state.selectedFoods.slice(
                      idx + 1, this.state.selectedFoods.length
                    ),
                  ],
                })
              )
            }
          />
          <SearchFood
            onFoodSelect={
              (food) => (
                this.setState({
                  selectedFoods: this.state.selectedFoods.concat(food),
                })
              )
            }
          />
        </Container>
        </LayoutContent>
      </div>
    );
  }
}

const MATCHING_ITEM_LIMIT = 25;
class SearchFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matchingFoods: [],
      showRemoveIcon: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchCancel = this.handleSearchCancel.bind(this);
  }
  handleSearchChange() {
    const query = this.refs.search.value;

    if (query === '') {
      this.setState({
        matchingFoods: [],
        showRemoveIcon: false,
      });
    } else {
      Client.search(query).then((foods) => (
        this.setState({
          matchingFoods: foods.slice(0, MATCHING_ITEM_LIMIT),
          showRemoveIcon: true,
        })
      ));
    }
  }
  handleSearchCancel() {
    this.setState({
      matchingFoods: [],
      showRemoveIcon: false,
    });
    this.refs.search.value = '';
  }
  render() {
    const removeIconStyle = (
      this.state.showRemoveIcon ? {} : { display: 'none' }
    );
    return (
      <div id='food-search'>
        <div className='search col-xs'>
          <InputGroup>
            <InputGroupAddon style={removeIconStyle}>
              <i
                  className='fa fa-minus-square pull-left text-danger'
                  style={removeIconStyle}
                  onClick={this.handleSearchCancel}
              />
            </InputGroupAddon>
            <input
                className='form-control'
                type='text'
                placeholder='Search foods...'
                ref='search'
                onChange={this.handleSearchChange}
            />
            <InputGroupAddon>
              <i className='fa fa-search' />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Table hover responsive size="lg" striped>
          <thead>
            <tr>
              <th>

              </th>
            </tr>
            <tr>
              <th className="text-xs-left">Description</th>
              <th className="text-xs-right">Kcal</th>
              <th className="text-xs-right">Protein (g)</th>
              <th className="text-xs-right">Fat (g)</th>
              <th className="text-xs-right">Carbs (g)</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.matchingFoods.map((food, idx) => (
                <tr
                  key={idx}
                  onClick={() => this.props.onFoodSelect(food)}
                  scope="row"
                >
                  <td className="text-xs-left">
                    <i className="fa fa-plus-square p-r-1 text-success" aria-hidden="true"></i>
                    {food.description}
                  </td>
                  <td className="text-xs-right">{food.kcal}</td>
                  <td className="text-xs-right">{food.protein_g}</td>
                  <td className="text-xs-right">{food.fat_g}</td>
                  <td className="text-xs-right">{food.carbohydrate_g}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

const SelectedFood = (props) => (
<div className="UIContent">
  <Table hover responsive size="sm" className="table-active" striped>
    <thead>
      <tr className="">
        <th>
          <div className="h4">Selected foods</div>
        </th>
      </tr>
      <tr className="bg-inverse">
        <th className="text-xs-left">Description</th>
        <th className="text-xs-right">Kcal</th>
        <th className="text-xs-right">Protein (g)</th>
        <th className="text-xs-right">Fat (g)</th>
        <th className="text-xs-right">Carbs (g)</th>
      </tr>
    </thead>
    <tbody>
      {
        props.foods.map((food, idx) => (
          <tr
            key={idx}
            onClick={() => props.onFoodRemove(idx)}
            className="table-info"
          >
            <td className="text-xs-left">
              {food.description}
              <i className="fa fa-trash pull-xs-right" aria-hidden="true"></i>
            </td>
            <td className="text-xs-right">{food.kcal}</td>
            <td className="text-xs-right">{food.protein_g}</td>
            <td className="text-xs-right">{food.fat_g}</td>
            <td className="text-xs-right">{food.carbohydrate_g}</td>
          </tr>
        ))
      }
    </tbody>
    <tfoot>
      <tr className="bg-warning">
        <th>Total</th>
        <th className="text-xs-right">
          {props.foods.reduce((memo, f) => f.kcal + memo, 0)}
        </th>
        <th className="text-xs-right">
          {props.foods.reduce((memo, f) => f.protein_g + memo, 0).toFixed(2)}
        </th>
        <th className="text-xs-right">
          {props.foods.reduce((memo, f) => f.fat_g + memo, 0).toFixed(2)}
        </th>
        <th className="text-xs-right">
          {props.foods.reduce((memo, f) => f.carbohydrate_g + memo, 0).toFixed(2)}
        </th>
      </tr>
    </tfoot>
  </Table>
</div>
);

let _randomHexColor = function(){
    return '#'+parseInt(Math.ceil(Math.random()*16777215)).toString(16);
};

class SelectedFoodPieChart extends Component {
  constructor(props) {
    super(props);
  }
  _chartData(dataKey='kcal', dataLabel='Calories') {
      const labels = [];
      const data = [];
      const bgColors = [];
      const hoverColors = [];
      const tempDS = this._chartDataSetObject();
      const chartData = this._chartDataObject();
      const items = this.props.foods;

      items.map(function(food, idx){
        labels.push(food.description.match(/(\b\w+\b\S){1,3}/g).join(' '));
        data.push(food[dataKey]);
        bgColors.push(_randomHexColor());
        hoverColors.push(_randomHexColor());
      });

      tempDS.data = data;
      tempDS.backgroundColor = bgColors;
      tempDS.hoverBackgroundColor = hoverColors;
      tempDS.label = dataLabel;
      chartData.labels = labels;
      chartData.datasets.push(tempDS);
      return chartData;

  }
  _chartOptions(displayLegend=true) {
      return {
          legend: {
              display: displayLegend
          },
          title: {
              text:'',
              display: false
          }
      };
  }
  _chartDataObject(){
      return {
          labels: [],
          datasets: []
      };
  }
  _chartDataSetObject(){
      return {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
          label: ''
      };
  }
  render(){
    var pieChart, barChart;
    var cardGroup;

    if(this.props.foods.length) {
        pieChart = (
            <Card>
                <CardBlock>
                    <CardTitle>Total Calories</CardTitle>
                    <Pie data={this._chartData()}
                         options={this._chartOptions(false)}
                    />
                </CardBlock>
            </Card>
        );
        barChart = (
            <Card>
                <CardBlock>
                    <CardTitle>Fat Content</CardTitle>
                    <Bar data={this._chartData('fat_g', 'Fat(g)')}
                         options={this._chartOptions()}
                    />
                </CardBlock>
            </Card>
        );
        cardGroup = (
            <CardGroup>
                {pieChart}
                {barChart}
            </CardGroup>
        )
    }
    return (
        <div className="UIComponent glossy">
            {cardGroup}
        </div>

    );
  }
}
export default FoodApi;
