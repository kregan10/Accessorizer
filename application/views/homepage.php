<div class="avatar">

    <img id="guy" src="assets/img/guy.png" alt="Avatar">

    <div id='overlay'>

        <div class="sidebar">

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
            </div>

            <div class="dropdown">
                <button class="btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown">Presets
                <span class="caret"></span></button>
                <ul id="homepage-presets" class="dropdown-menu">
                  {sets}
                    <li class="dropdown-item" style="text-transform: capitalize"><a href="#">{name}</a></li>
                  {/sets}
                </ul>
            </div>

        </div>

        <!-- These are the slots for the items -->
        <div class="slots">
          {categories}
            <div id="{categoryName}" class="dropzone {categoryName}" style="text-transform: capitalize">
              {categoryName}
            </div>
          {/categories}
        </div>

    </div>
</div>
