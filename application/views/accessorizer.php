<div class="avatar">

    <img id="guy" src="assets/img/guy.png" alt="Avatar">

    <div id='overlay'>

        <!-- These are the items.
        TODO: give an ID to each for indentification -->
        <div class="items">

            <h2>Weapon</h2>
            <img id="frying-pan" class="draggable drag-drop weapon" src="assets/img/frying-pan.png" />
            <img id="groza" class="draggable drag-drop weapon" src="assets/img/groza.png" />
            <img id="m16" class="draggable drag-drop weapon" src="assets/img/M16.png" />

            <h2>Head</h2>
            <img id="ballistic-mask" class="draggable drag-drop head" src="assets/img/ballistic-mask.png" />
            <img id="level3-helmet" class="draggable drag-drop head" src="assets/img/level3-helmet.png" />
            <img id="level2-helmet" class="draggable drag-drop head" src="assets/img/level2-helmet.png" />

            <h2>Accessory</h2>
            <img id="smoke-grenade" class="draggable drag-drop accessory" src="assets/img/smoke-grenade.png" />
            <img id="frag-grenade" class="draggable drag-drop accessory" src="assets/img/frag-grenade.png" />
            <img id="redbull" class="draggable drag-drop accessory" src="assets/img/redbull.png" />

            <h2>Chest</h2>
            <img id="level1-vest" class="draggable drag-drop chest" src="assets/img/level1-vest.png" />
            <img id="level2-vest" class="draggable drag-drop chest" src="assets/img/level2-vest.png" />
            <img id="level3-vest" class="draggable drag-drop chest" src="assets/img/level3-vest.png" />

        </div>

        <br />

        <!-- These are the slots for the items -->
        <div class="slots">
            <div id="head" class="dropzone head">
                Head
            </div>

            <div id="weapon" class="dropzone weapon">
                Weapon
            </div>

            <div id="accessory" class="dropzone accessory">
                Accessory
            </div>

            <div id="chest" class="dropzone chest">
                Chest
            </div>
        </div>

    <form action="" method="POST">
        <input type="text" name="head" value="" hidden>
        <input type="text" name="chest" value="" hidden>
        <input type="text" name="weapon" value="" hidden>
        <input type="text" name="accessory" value="" hidden>
        <input type="submit" name="submit" value="submit">
    </form>

        <div class="stats">

        </div>

    </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/js/interact.js"></script>
<script type="text/javascript" src="assets/js/index.js"></script>
