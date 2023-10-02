#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var moment = require('moment')
var notifier = require('node-notifier')
var EVENTS_FILE = path.join(__dirname, 'events.json');
var events = []

if (fs.existsSync(EVENTS_FILE)) {
  events = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf-8'))
}

var checkNotifications = () => {
  // console.log('checking for events notifications:')
  events.forEach(event => {
    switch (event.frequency) {
      case 'yearly':
        checkOneWeekBefore(event, true)
        checkOnTheDay(event, true)
        break;
      default:
        checkOneWeekBefore(event)
        checkOnTheDay(event)
    }
  })
}

var checkOneWeekBefore = (event, ignoreYear = false) => {
  var today = moment();
  var eventDate = ignoreYear ?
    moment(event.date).year(today.year()) :
    moment(event.date)
  var oneWeekBefore = eventDate.clone().subtract(7, 'days')
  if (today.isSame(oneWeekBefore, 'day')) {
    notify(`Reminder: ${event.name} ${event.description} is one week away!`)
  }
}

var checkOnTheDay = (event, ignoreYear = false) => {
  var today = moment();
  var eventDate = ignoreYear ?
    moment(event.date).year(today.year()) :
    moment(event.date)
  if (today.isSame(eventDate, 'day')) {
    notify(`Reminder: Today is ${event.name} ${event.description}`)
  }
}

var upcomingEventsInNext30Days = () => {
  // console.log('Events in the next 30 days:')
  events.forEach(event => {
    var today = moment()
    var eventDate = event.frequency === 'yearly' ?
      moment(event.date).year(today.year()) :
      moment(event.date)
    if (eventDate.isAfter(today) && eventDate.diff(today, 'days') <= 30) {
      notify(
        `${event.name}'s event is in ${eventDate.diff(today, 'days')} days.`
      )
    }
  })
}

checkNotifications()
upcomingEventsInNext30Days()

function notify (message) {
  // console.log(message)
  notifier.notify(
    {
      title: 'event_notifier',
      message: message,
      sound: true,
      wait: true
    }
  )
}
