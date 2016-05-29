# Charity Counter
Use `Charity Counter` to provide attendees of your events interesting insides into how much donations were already collected. We made the experience that live information like this can be used to motivate visitors into reaching the next donation milestone in a fun and entertaining way, giving them direct feedback what was already accomplished.

## Easy To Use Server
![server](https://cloud.githubusercontent.com/assets/992826/15629543/98491702-251b-11e6-9208-d0377f51a95a.png)
The Charity Counter Project provides an easy to use administration interface which you can use to add new donations as well as setting the end date for the countdown. The countdown is completly optional if you do not set a date it will not be displayed. Under the hood the server hosts a socket all clients listen on so you get instant updates on all your screens and projectors running the client software. Quitting the server after your event will give you the option to export the displayed chart as a beautiful PDF file.

## Client For Projectors And Other Screens
![client](https://cloud.githubusercontent.com/assets/992826/15629542/96c2a86c-251b-11e6-8da8-9fa55d39c603.png)
The client software can be started on as many computers as you like providing you with the possibility to add multiple screens all over your event location. We usually run one client on a big projector and several others on smaller screens in the catering area and on information desks. All clients are in sync with the server, so there is nothing manual to do for you. All you have to do is enter the IP address of your server and you are good to go!

## Code used in this project
- [Electron](http://electron.atom.io) ([MIT License](https://github.com/electron/electron/blob/master/LICENSE))
- [socket.io](https://www.npmjs.com/package/socket.io) (MIT License)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client) (MIT License)
- [jQuery](https://www.npmjs.com/package/jquery) (MIT License)
- [chartist](https://www.npmjs.com/package/chartist) (Do What The F*ck You Want To Public License)
- [SweetAlert2](https://www.npmjs.com/package/sweetalert2) (MIT License)
- [air-datepicker](https://github.com/t1m0n/air-datepicker) (MIT License)
- [jquery-animateNumber](http://www.cssflow.com/snippets/sign-up-form) ([MIT License](https://github.com/aishek/jquery-animateNumber/blob/master/LICENSE))
- [Sign Up Form](http://www.cssflow.com/snippets/sign-up-form) ([MIT License](http://www.cssflow.com/mit-license))
- [Sign Up For Beta Form](http://codepen.io/erikapdx/pen/BnfjH)


The MIT License (MIT)
=====================

Copyright © `2016` `Paul-Vincent Roll`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
