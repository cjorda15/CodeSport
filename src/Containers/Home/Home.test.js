import {shallow,mount,render} from 'enzyme'
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.js'

const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const path = require('path')
const routes = require('./routes')


var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:5000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};



describe('home test', () => {

  it("should contain children elements", () => {
  const wrapper = shallow(<Home/>)
  console.log(wrapper)
  console.log("!!!!!!!!");
  })

})
