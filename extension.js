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
let fx_lvl;
let dfx;
let bcfx;

function _recalcEffect() {
	if (fx_ndx){
		dfx.factor = fx_lvl / 255;
		_bcl(bc_v[fx_ndx-1],fx_lvl);
	}
}

function _levelEffect(actor, event) {
    if (fx_ndx){
        if (event.get_scroll_direction() == Clutter.ScrollDirection.UP)
            if (fx_lvl < 241)
                fx_lvl += 15;
        if (event.get_scroll_direction() == Clutter.ScrollDirection.DOWN)
            if (fx_lvl > 14)
                fx_lvl -= 15;
        _recalcEffect();
    }
}

function _toggleEffect() {
    if (fx_ndx==0) {
        Main.uiGroup.add_effect( bcfx );
        Main.uiGroup.add_effect( dfx );
    }
    fx_ndx = (fx_ndx + 1) % (bc_v.length+1);
    _recalcEffect();
    if (fx_ndx==0){	
        Main.uiGroup.remove_effect( dfx );
        Main.uiGroup.remove_effect( bcfx );
    }
}

function _l(c, l){
	return Math.round((c - 127)*l/255+127);
}

function _cl(c, l){
	return {
		red:_l(c.red, l), 
		green:_l(c.green, l), 
		blue:_l(c.blue, l),
		alpha: c.alpha 
	};
}

function _bcl(bc, l){
    b_cl = new Clutter.Color(_cl(bc[0],l));
    bcfx.brightness = b_cl;
    c_cl = new Clutter.Color(_cl(bc[1],l));
    bcfx.contrast = c_cl;
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
	dfx = new Clutter.DesaturateEffect();
	bcfx = new Clutter.BrightnessContrastEffect();

    bc_v = [
        [ {red:143, green:71, blue: 0, alpha:255}, {red:143, green:135, blue: 127, alpha:255} ],
//        [ {red:143, green:79, blue: 0, alpha:255}, {red:143, green:131, blue: 127, alpha:255} ],
        [ {red:71, green:143, blue: 0, alpha:255}, {red:135, green:143, blue: 127, alpha:255} ],
        [ {red:0, green:127, blue: 143, alpha:255}, {red:127, green:127, blue: 143, alpha:255} ],
        [ {red:143, green:127, blue: 95, alpha:255}, {red:143, green:127, blue: 127, alpha:255} ],
        [ {red:127, green:127, blue: 127, alpha:255}, {red:127, green:127, blue: 127, alpha:255} ],
    ]

    fx_ndx = 0;
    fx_lvl = 255;
    //Signal connection
    button.connect('button-press-event', _toggleEffect);
    button.connect('scroll-event', _levelEffect);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
