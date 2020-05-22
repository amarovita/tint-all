Tint all
========

This is a Gnome shell extension to give the whole screen a different
color tint. It supports multiple color tints in various gradations.

The extension can be installed from the Gnome extension page:

https://extensions.gnome.org/extension/1471/tint-all/

Click the extension icon to cycle between the various color tints:

- none (normal)
- amber
- green
- cyan
- sepia (old photo)
- grayscale

Use the mouse wheel to scroll over the extension icon to increase or
decrease the intensity of the color effect.

Credits
-------

This extension is written by [Amaro Vita](https://github.com/amarovita).

The code is partially based on the
[desaturate_all](https://github.com/laerne/desaturate_all) extension by
[laerne](https://github.com/laerne/).

Development
-----------

Copy this folder to the gnome-shell extension folders, typically under
`.local/share/gnome-shell/extensions`.

In a terminal, you can use the following commands:

``` sh
git clone https://github.com/amarovita/tint-all.git`

mv tint-all ".local/share/gnome-shell/extensions/tint-all@amarovita.github.com"
```

Then restart gnome by pressing `ALT`+`F2`, then entering `r` and
validating with `RETURN`. Alternatively, log out and log in again.

You can now enable the extension by browsing to
https://extensions.gnome.org/local.
