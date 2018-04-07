<div class="avatar">

    <img id="guy" src="assets/img/guy.png" alt="Avatar">

    <div id='overlay'>

        <!-- These are the items.
        TODO: give an ID to each for indentification -->
        <div id="all-items" class="items">
          {categories}
            <h2>{categoryName}</h2>
            {accessories}
              <div id="{accessoryName}" class="couponcode">
                <img class="draggable drag-drop {categoryName}" src="{accessoryImage}"/>
                <div class="coupontooltip">
                  <div class="coupontooltip-text">
                    <h4>{accessoryDisplayName}</h4>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Attribute</th>
                          <th scope="col">Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Weight</td>
                          <td id="weight">{accessoryWeight}</td>
                        </tr>
                        <tr>
                          <td>Damage</td>
                          <td id="damage">{accessoryDamage}</td>
                        </tr>
                        <tr>
                          <td>Protection</td>
                          <td id="protection">{accessoryProtection}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            {/accessories}
          {/categories}
        </div>

        <br />

        <!-- These are the slots for the items -->
        <form action="set/save" method="post" id="set-form">
          <div class="slots">
            {categories}
              <div id="{categoryName}" class="dropzone {categoryName}" style="text-transform: capitalize">
                <input id="{categoryName}-selected" name="{categoryName}" hidden/>
                {categoryName}
              </div>
            {/categories}
          </div>
        </form>

          <div class="stats">
            <h3>Weight</h3>
            <div class="progress">
              <div id="weight-bar" class="progress-bar bg-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <span class="sr-only"></span>
              </div>
            </div>
            <h3>Damage</h3>
            <div class="progress">
              <div id="damage-bar" class="progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <span class="sr-only"></span>
              </div>
            </div>
            <h3>Protection</h3>
            <div class="progress">
              <div id="protection-bar" class="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <span class="sr-only"></span>
              </div>
            </div>

            <div class="row">
                <input id="set-name" form="set-form" class="form-control" type="text" name="name" placeholder="Set Name" required>
                <input id="set-save" form="set-form" class="btn btn-success mx-auto" type="submit" value="Save">
            </div>
            <div class="row">
                <input id="set-reset" class="btn btn-danger mx-auto" type="reset" name="reset" value="Reset">
            </div>

            <div class="dropdown">
                <button class="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">Presets
                <span class="caret"></span></button>
                <ul id="homepage-presets" class="dropdown-menu">
                  {sets}
                    <li class="dropdown-item" data-setid="{id}" style="text-transform: capitalize"><a>{name}</a></li>
                  {/sets}
                </ul>
            </div>

          </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="assets/js/saveSetMenu.js"></script>

