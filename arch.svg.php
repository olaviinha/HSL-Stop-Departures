<?php
  header('Content-type: image/svg+xml');
  $s = 10;
  $c = 'fff';
  $p = '';

  if(isset($_GET['s'])){
    $s = $_GET['s'];
  }

  if(isset($_GET['c'])){
    $c = $_GET['c'];
  }

  if(isset($_GET['p'])){
    $p = $_GET['p'];
  }
  
?>
<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* <![CDATA[ */
    .curve {
      fill: transparent;
      stroke: #<?php echo $c; ?>;
      stroke-width: <?php echo $s; ?>px;
    }
    <?php
    if($p=='st'){
      echo ".inner, .mid, .outer { display: none; }";
    }
    if($p=='in'){
      echo ".mid, .outer { display: none; }";
    }
    if($p=='mid'){
      echo ".outer { display: none; }";
    }
    ?>
    /* ]]> */
  </style>
  <path d="M100 50 C 70 50, 50 70, 50 100" class="inner curve"/>
  <path d="M100 30 C 60 30, 30 60, 30 100" class="mid curve"/>
  <path d="M100 10 C 50 10, 10 50, 10 100" class="outer curve"/>
</svg>
