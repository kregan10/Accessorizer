<div class="avatar">

    <img id="guy" src="assets/img/guy.png" alt="Avatar">

    <div id='overlay'>

        <!-- These are the items.
        TODO: give an ID to each for indentification -->
        <div id="all-items" class="items">
          <?php $count = -1; ?>
          <?php foreach ($accessories as $accessory): ?>
            <?php if ($count < $accessory->categoriesId): ?>
                <?php $count = $accessory->categoriesId; ?>
                <h2><?php echo $categories[$count]->name; ?></h2>
            <?php endif; ?>
            <div id="<?php echo $accessory->name; ?>" class="couponcode">
                <img class="draggable drag-drop <?php echo strtolower($categories[$accessory->categoriesId]->name); ?>" src="<?php echo $accessory->image; ?>"/>
                <div class="coupontooltip">
                  <div class="coupontooltip-text">
                    <h4><?php echo $accessory->displayName; ?></h4>
                    <p>Weight: <span id="weight"><?php echo $accessory->weight; ?></span></p>
                    <p>Damage: <span id="damage"><?php echo $accessory->damage; ?></span></p>
                    <p>Protection: <span id="protection"><?php echo $accessory->protection; ?></span></p>
                  </div>
                </div>
            </div>
          <?php endforeach; ?>

        </div>

        <br />

        <!-- These are the slots for the items -->
        <div class="slots">
          <?php foreach ($categories as $category): ?>
            <div id="<?php echo strtolower($category->name); ?>" class="dropzone <?php echo strtolower($category->name); ?>">
              <?php echo $category->name ?>
            </div>
          <?php endforeach; ?>
        </div>

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
              <input id="set-name" class="form-control" type="text" name="set" placeholder="Set Name">
              <input id="set-save" class="btn btn-success mx-auto" type="submit" name="submit" value="Save">
          </div>
          <div class="row">
              <input id="set-reset" class="btn btn-danger mx-auto" type="reset" name="reset" value="Reset">
          </div>

        </div>

    </div>
</div>
