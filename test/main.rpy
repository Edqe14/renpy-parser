define p = Character("Player", color="#444444")
image jane happy = "jane_happy.png"

init:
  $ f = Character("Friend", color="#FEFEFE")
  image black = "#000"

menu:
  "Intro":
    jump intro

  "End":
    jump end

label intro:

  scene bg room day
  with fade

  "Lorem Ipsum sit amet,"

  "consectetur adipiscing elit,"

  "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

  show Friend
  with moveoutleft

  f "Malesuada pellentesque elit eget gravida cum sociis natoque."

  "Friend 2" "..."

  hide Friend

  return
  with fade

label end:

  play music "bgm.mp3" fadein 1.0

  show Player at left

  show Friend at right
  with dissolve

  play sound "sfx.mp3"

  "Curabitur vitae nunc sed velit dignissim."

  pause

  queue music "next_bgm.mp3"

  f "Praesent elementum facilisis leo vel fringilla."

  stop music

  hide Friend
  hide Player

  return