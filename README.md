# Charity Counter
I wrote this for an annual charity event I helped organize when I still was in school. The projects consists out of two components a `client` and a `server`.

## Server
![server](https://cloud.githubusercontent.com/assets/992826/15629543/98491702-251b-11e6-9208-d0377f51a95a.png)
The `server` hosts the `socket` the clients will connect to. It is used to `set` the `end time` of the event and also to `add` new `donations`.
Closing the server will give you the option to `export` the displayed `chart` as a `pdf file`.

## Client
![client](https://cloud.githubusercontent.com/assets/992826/15629542/96c2a86c-251b-11e6-8da8-9fa55d39c603.png)
The `client` is supposed to run on a `projector` or `large screen`. You can start it on as many different computers as you like in order to have `multiple` displays.
All `clients` should be `in sync` with the `server`.

## Code used in this project
- [Electron](http://electron.atom.io) ([MIT License](https://github.com/electron/electron/blob/master/LICENSE))
- [socket.io](https://www.npmjs.com/package/socket.io) (MIT License)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client) (MIT License)
- [jQuery](https://www.npmjs.com/package/jquery) (MIT License)
- [chartist](https://www.npmjs.com/package/chartist) (Do What The F*ck You Want To Public License)
- [SweetAlert2](https://www.npmjs.com/package/sweetalert2) (MIT License)
- [pickadate.js](http://amsul.github.io/pickadate.js) (MIT License)
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
