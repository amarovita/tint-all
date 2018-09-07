// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// This code based on grayscale-all extension found https://github.com/laerne/desaturate_all
// Repo: https://github.com/amarovita/tint-all

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;

let button;
let extension_icon;
let color_effect;
let bc_effect;
let fx_ndx;

function _toggleEffect() {
    if (fx_ndx) {
        Main.uiGroup.remove_effect( color_effect[fx_ndx-1]);
        Main.uiGroup.remove_effect( bc_effect[fx_ndx-1]);
    }
    fx_ndx = (fx_ndx + 1) % (color_effect.length+1);
    if (fx_ndx){	
        Main.uiGroup.add_effect( color_effect[fx_ndx-1]);
        Main.uiGroup.add_effect( bc_effect[fx_ndx-1]);
    }
}


function _tint(color) {
    fx = new Clutter.ColorizeEffect();
    cl = new Clutter.Color(color);
    fx.tint = cl;
    return fx;
}

function _bc(b, c){
    fx = new Clutter.BrightnessContrastEffect();
    b_cl = new Clutter.Color(b);
    fx.brightness = b_cl;
    c_cl = new Clutter.Color(c);
    fx.contrast = c_cl;
    return fx; 
}

function init() {
    //Creation of button
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    extension_icon = new St.Icon({ icon_name: 'applications-graphics-symbolic',
                                   style_class: 'system-status-icon' });
    button.set_child(extension_icon);

    //Creation of effect
    color_effect = [
			_tint( {red:255, green:128, blue: 0, alpha:255} ),
			_tint( {red:128, green:255, blue: 0, alpha:255} ),
			_tint( {red:0, green:224, blue: 255, alpha:255} ),
			_tint( {red:255, green:192, blue: 144, alpha:255} ),
			new Clutter.DesaturateEffect()
		]
    bc_effect = [
        _bc( {red:159, green:159, blue: 127, alpha:255}, {red:183, green:183, blue: 127, alpha:255} ),
        _bc( {red:143, green:143, blue: 127, alpha:255}, {red:155, green:155, blue: 127, alpha:255} ),
        _bc( {red:127, green:159, blue: 159, alpha:255}, {red:127, green:183, blue: 183, alpha:255} ),
        _bc( {red:143, green:143, blue: 143, alpha:255}, {red:151, green:151, blue: 151, alpha:255} ),
        _bc( {red:127, green:127, blue: 127, alpha:255}, {red:127, green:127, blue: 127, alpha:255} ),
    ]
    fx_ndx = 0;
    //Signal connection
    button.connect('button-press-event', _toggleEffect);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
