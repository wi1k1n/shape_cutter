## Shape Cutter

A small tool, that has a limited functionality, namely:
1. Given the shape find best fit into the square (brute-forced)
2. Cuts the shape into subshapes (shape can be concave, but not self-intersected!)

Originally the idea of this toolset is to help estimating and searching for best placement of the objects on 3D-printer's heating plate.

## TODO:
- ~~Mouse interaction for the cutting line~~
- Optimizing a single cut for the subshapes to fit the square
- Using something better than brute-force (genetic algo?)
- Different metrics:
	- optimize max size of each subshape (w/ or w/o number of subshapes constraint)
	- optimize number of subshapes (w/ or w/o max size constraint)
	- optimize length of a cut line
- Optimizing multiple cuts
- ~~GUI help -> make terminal functional~~ Upd: not related anymore
- GUI instead of drawing closed poly, draw it smarter: closed segment with gray dashed line, and a separate color for the last segment (to cursor)
	- Get rid of self-intersections
	- Probably draw vertices as well (custom 'selected' state instead of the default one)
- ~~Add 'm' for moving shapes, 'del' for deleting them (instead of Esc, which should be only used for stopping current shape)~~
	- Show selected shape (more than just .selected = true)