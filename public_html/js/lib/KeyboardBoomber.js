// // THREEx.KeyboardState.js keep the current state of the keyboard.
// // It is possible to query it at any time. No need of an event.
// // This is particularly convenient in loop driven case, like in
// // 3D demos or games.
// //
// // # Usage
// //
// // **Step 1**: Create the object
// //
// // ```var keyboard	= new THREEx.KeyboardState();```
// //
// // **Step 2**: Query the keyboard state
// //
// // This will return true if shift and A are pressed, false otherwise
// //
// // ```keyboard.pressed("shift+A")```
// //
// // **Step 3**: Stop listening to the keyboard
// //
// // ```keyboard.destroy()```
// //
// // NOTE: this library may be nice as standaline. independant from three.js
// // - rename it keyboardForGame
// //
// // # Code
// //
//
// /** @namespace */
// var THREEx	= THREEx 		|| {};
// var Key = THREEx;
//
// /**
//  * - NOTE: it would be quite easy to push event-driven too
//  *   - microevent.js for events handling
//  *   - in this._onkeyChange, generate a string from the DOM event
//  *   - use this as event name
//  */
// THREEx.KeyboardState	= function()
// {
//     // to store the current state
//     this.keyCodes	= {};
//     this.modifiers	= {};
//
//     // create callback to bind/unbind keyboard events
//     var self	= this;
//     this._onKeyDown	= function(event){ self._onKeyChange(event, true); };
//     this._onKeyUp	= function(event){ self._onKeyChange(event, false);};
//
//     // bind keyEvents
//     document.addEventListener("keydown", this._onKeyDown, false);
//     document.addEventListener("keyup", this._onKeyUp, false);
// }
//
// /**
//  * To stop listening of the keyboard events
//  */
// THREEx.KeyboardState.prototype.destroy	= function()
// {
//     // unbind keyEvents
//     document.removeEventListener("keydown", this._onKeyDown, false);
//     document.removeEventListener("keyup", this._onKeyUp, false);
// }
//
// THREEx.KeyboardState.MODIFIERS	= ['shift', 'ctrl', 'alt', 'meta'];
// THREEx.KeyboardState.ALIAS	= {
//     'left'		: 37,
//     'up'		: 38,
//     'right'		: 39,
//     'down'		: 40,
//     'space'		: 32,
//     'pageup'	: 33,
//     'pagedown'	: 34,
//     'tab'		: 9
// };
//
// /**
//  * to process the keyboard dom event
//  */
// THREEx.KeyboardState.prototype._onKeyChange	= function(event, pressed)
// {
//     // log to debug
//     //console.log("onKeyChange", event, pressed, event.keyCode, event.shiftKey, event.ctrlKey, event.altKey, event.metaKey)
//
//     // update this.keyCodes
//     var keyCode		= event.keyCode;
//     this.keyCodes[keyCode]	= pressed;
//
//     // update this.modifiers
//     this.modifiers['shift']= event.shiftKey;
//     this.modifiers['ctrl']	= event.ctrlKey;
//     this.modifiers['alt']	= event.altKey;
//     this.modifiers['meta']	= event.metaKey;
// }
//
// /**
//  * query keyboard state to know if a key is pressed of not
//  *
//  * @param {String} keyDesc the description of the key. format : modifiers+key e.g shift+A
//  * @returns {Boolean} true if the key is pressed, false otherwise
//  */
// THREEx.KeyboardState.prototype.pressed	= function(keyDesc)
// {
//     var keys	= keyDesc.split("+");
//     for(var i = 0; i < keys.length; i++){
//         var key		= keys[i];
//         var pressed;
//         if( THREEx.KeyboardState.MODIFIERS.indexOf( key ) !== -1 ){
//             pressed	= this.modifiers[key];
//         }else if( Object.keys(THREEx.KeyboardState.ALIAS).indexOf( key ) != -1 ){
//             pressed	= this.keyCodes[ THREEx.KeyboardState.ALIAS[key] ];
//         }else {
//             pressed	= this.keyCodes[key.toUpperCase().charCodeAt(0)]
//         }
//         if( !pressed)	return false;
//     };
//     return true;
// }
KeyboardState = function()
{
    // bind keyEvents
    document.addEventListener("keydown", KeyboardState.onKeyDown, false);
    document.addEventListener("keyup",   KeyboardState.onKeyUp,   false);
}

///////////////////////////////////////////////////////////////////////////////

KeyboardState.k =
{
    8: "backspace",  9: "tab",       13: "enter",    16: "shift",
    17: "ctrl",     18: "alt",       27: "esc",      32: "space",
    33: "pageup",   34: "pagedown",  35: "end",      36: "home",
    37: "left",     38: "up",        39: "right",    40: "down",
    45: "insert",   46: "delete",   186: ";",       187: "=",
    188: ",",      189: "-",        190: ".",       191: "/",
    219: "[",      220: "\\",       221: "]",       222: "'"
}

KeyboardState.status = {};

KeyboardState.keyName = function ( keyCode )
{
    return ( KeyboardState.k[keyCode] != null ) ?
        KeyboardState.k[keyCode] :
        String.fromCharCode(keyCode);
}

KeyboardState.onKeyUp = function(event)
{
    var key = KeyboardState.keyName(event.keyCode);
    if ( KeyboardState.status[key] )
        KeyboardState.status[key].pressed = false;
}

KeyboardState.onKeyDown = function(event)
{
    var key = KeyboardState.keyName(event.keyCode);
    if ( !KeyboardState.status[key] )
        KeyboardState.status[key] = { down: false, pressed: false, up: false, updatedPreviously: false };
}

KeyboardState.prototype.update = function()
{
    for (var key in KeyboardState.status)
    {
        // insure that every keypress has "down" status exactly once
        if ( !KeyboardState.status[key].updatedPreviously )
        {
            KeyboardState.status[key].down        		= true;
            KeyboardState.status[key].pressed     		= true;
            KeyboardState.status[key].updatedPreviously = true;
        }
        else // updated previously
        {
            KeyboardState.status[key].down = false;
        }

        // key has been flagged as "up" since last update
        if ( KeyboardState.status[key].up )
        {
            delete KeyboardState.status[key];
            continue; // move on to next key
        }

        if ( !KeyboardState.status[key].pressed ) // key released
            KeyboardState.status[key].up = true;
    }
}

KeyboardState.prototype.down = function(keyName)
{
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].down);
}

KeyboardState.prototype.pressed = function(keyName)
{
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].pressed);
}

KeyboardState.prototype.up = function(keyName)
{
    return (KeyboardState.status[keyName] && KeyboardState.status[keyName].up);
}

KeyboardState.prototype.debug = function()
{
    var list = "Keys active: ";
    for (var arg in KeyboardState.status)
        list += " " + arg
    console.log(list);
}