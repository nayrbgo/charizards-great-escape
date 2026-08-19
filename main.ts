namespace SpriteKind {
    export const Wizard = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Exit = SpriteKind.create()
    export const PizzaParlor = SpriteKind.create()
    export const Traffic = SpriteKind.create()
}

let charizard: Sprite = null
let harry: Sprite = null
let gateKey: Sprite = null
let gate: Sprite = null
let pizzaParlor: Sprite = null
let hasKey = false
let level = 0
let spellTimer = 0

const charizardImg = img`
    . . . . . . 2 2 2 . . . . . . .
    . . . . 2 2 4 4 4 2 . . . . . .
    . . . 2 4 4 4 4 4 4 2 . . . . .
    . . 2 4 4 f 4 4 f 4 4 2 . . . .
    . . 2 4 4 4 4 4 4 4 4 2 . . . .
    . . . 2 4 4 4 4 4 4 2 . . . . .
    . . 2 2 2 4 4 4 4 2 2 2 . . . .
    . 2 4 4 2 4 4 4 4 2 4 4 2 . . .
    2 4 4 4 2 4 4 4 4 2 4 4 4 2 . .
    . 2 4 4 2 4 4 4 4 2 4 4 2 . . .
    . . 2 2 2 4 4 4 4 2 2 2 . . . .
    . . . . 2 4 4 4 4 2 . . . . . .
    . . . . 2 4 2 2 4 2 . . . . . .
    . . . 2 4 4 2 2 4 4 2 . . . . .
    . . 2 4 4 2 . . 2 4 4 2 . . . .
    . . . 2 2 . . . . 2 2 . . . . .
`

const harryImg = img`
    . . . . . f f f f . . . . . . .
    . . . . f 1 1 1 1 f . . . . . .
    . . . f 1 1 1 1 1 1 f . . . . .
    . . . f 1 f 1 1 f 1 f . . . . .
    . . . f 1 1 1 1 1 1 f . . . . .
    . . . . f 1 1 1 1 f . . . . . .
    . . . . . f 1 1 f . . . . . . .
    . . . . 8 8 8 8 8 8 . . . . . .
    . . . 8 8 8 8 8 8 8 8 . . . . .
    . . . 8 8 8 8 8 8 8 8 . . . . .
    . . . . 8 8 8 8 8 8 . . . . . .
    . . . . 8 8 8 8 8 8 . . . . . .
    . . . . 8 8 . . 8 8 . . . . . .
    . . . 8 8 . . . . 8 8 . . . . .
    . . . 8 . . . . . . 8 . . . . .
    . . . . . . . . . . . . . . . .
`

const keyImg = img`
    . . . . 5 5 5 5 . . . .
    . . . 5 . . . . 5 . . .
    . . . 5 . . . . 5 . . .
    . . . . 5 5 5 5 . . . .
    . . . . . 5 . . . . . .
    . . . . . 5 5 5 5 5 . .
    . . . . . 5 . . 5 . . .
    . . . . . 5 . . 5 . . .
`

const gateImg = img`
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d d d d d d d d d d d d d d d
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d d d d d d d d d d d d d d d
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d d d d d d d d d d d d d d d
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
    d d . . d d . . d d . . d d . .
`

const pizzaImg = img`
    . . . . . . 2 2 . . . . . . . .
    . . . . . 2 4 4 2 . . . . . . .
    . . . . 2 4 4 4 4 2 . . . . . .
    . . . 2 4 4 5 4 4 4 2 . . . . .
    . . 2 4 5 4 4 4 5 4 4 2 . . . .
    . 2 4 4 4 4 2 4 4 4 4 4 2 . . .
    2 4 5 4 4 4 4 4 5 4 4 4 4 2 . .
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`

function makePlayer() {
    charizard = sprites.create(charizardImg, SpriteKind.Player)
    controller.moveSprite(charizard, 90, 90)
    charizard.setFlag(SpriteFlag.StayInScreen, true)
}

function clearLevel() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Wizard)
    sprites.destroyAllSpritesOfKind(SpriteKind.Key)
    sprites.destroyAllSpritesOfKind(SpriteKind.Exit)
    sprites.destroyAllSpritesOfKind(SpriteKind.PizzaParlor)
    sprites.destroyAllSpritesOfKind(SpriteKind.Traffic)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
}

function startBackyard() {
    clearLevel()
    level = 1
    hasKey = false
    scene.setBackgroundColor(7)
    game.splash("LEVEL 1", "ESCAPE HARRY'S BACKYARD")
    makePlayer()
    charizard.setPosition(20, 95)

    harry = sprites.create(harryImg, SpriteKind.Wizard)
    harry.setPosition(125, 30)
    harry.follow(charizard, 22)

    gateKey = sprites.create(keyImg, SpriteKind.Key)
    gateKey.setPosition(125, 95)

    gate = sprites.create(gateImg, SpriteKind.Exit)
    gate.setPosition(150, 60)

    info.setLife(3)
    game.showLongText("Grab the golden backyard key, dodge Harry's spells, then reach the gate. Press A to breathe fire.", DialogLayout.Bottom)
}

function startStreet() {
    clearLevel()
    level = 2
    scene.setBackgroundColor(9)
    game.splash("LEVEL 2", "PIZZA OR BUST")
    makePlayer()
    charizard.setPosition(12, 60)

    pizzaParlor = sprites.create(pizzaImg, SpriteKind.PizzaParlor)
    pizzaParlor.setPosition(145, 60)

    for (let i = 0; i < 4; i++) {
        let car = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . 8 8 8 8 8 8 . . . . . .
            . . . 8 8 8 8 8 8 8 8 . . . . .
            . . 8 8 8 8 8 8 8 8 8 8 . . . .
            . 8 8 8 8 8 8 8 8 8 8 8 8 . . .
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 . .
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 . .
            . . f f . . . . . . f f . . . .
            . f 1 1 f . . . . f 1 1 f . . .
            . . f f . . . . . . f f . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Traffic)
        car.setPosition(45 + i * 28, 25 + (i % 2) * 70)
        car.vy = (i % 2 == 0) ? 35 : -35
        car.setFlag(SpriteFlag.BounceOnWall, true)
    }

    game.showLongText("Mario's favorite pizza parlor is on the far right. Cross the street without becoming dragon road pizza.", DialogLayout.Bottom)
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (charizard != null) {
        let fireball = sprites.createProjectileFromSprite(img`
            . . 2 2 . .
            . 2 4 4 2 .
            2 4 5 4 4 2
            2 4 4 5 4 2
            . 2 4 4 2 .
            . . 2 2 . .
        `, charizard, 100, 0)
        fireball.setKind(SpriteKind.Projectile)
        music.pewPew.play()
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    if (!hasKey) {
        hasKey = true
        sprites.destroy(otherSprite, effects.confetti, 200)
        music.baDing.play()
        sprite.sayText("GOT THE KEY!", 800, false)
        info.changeScoreBy(100)
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Exit, function (sprite, otherSprite) {
    if (level == 1) {
        if (hasKey) {
            music.powerUp.play()
            startStreet()
        } else {
            sprite.sayText("NEED THE KEY!", 800, false)
            sprite.x -= 10
        }
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.PizzaParlor, function (sprite, otherSprite) {
    if (level == 2) {
        info.changeScoreBy(500)
        music.magicWand.play()
        game.splash("CHARIZARD ESCAPED!", "PIZZA ACHIEVED.")
        game.over(true, effects.confetti)
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Wizard, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.startEffect(effects.fire, 200)
    sprite.x -= 12
    sprite.y += 8
    pause(300)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.disintegrate, 150)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Traffic, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.startEffect(effects.ashes, 200)
    sprite.x -= 15
    pause(300)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Wizard, function (projectile, wizard) {
    sprites.destroy(projectile, effects.fire, 100)
    wizard.startEffect(effects.fire, 200)
    wizard.x += 15
    info.changeScoreBy(10)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemy) {
    sprites.destroy(projectile)
    sprites.destroy(enemy, effects.fire, 100)
    info.changeScoreBy(25)
})

game.onUpdateInterval(1100, function () {
    if (level == 1 && harry != null && charizard != null) {
        let spell = sprites.createProjectileFromSprite(img`
            . 8 . . 8 .
            . . 8 8 . .
            8 8 9 9 8 8
            . . 8 8 . .
            . 8 . . 8 .
            8 . . . . 8
        `, harry, 0, 45)
        spell.setKind(SpriteKind.Enemy)

        let dx = charizard.x - harry.x
        let dy = charizard.y - harry.y
        let mag = Math.sqrt(dx * dx + dy * dy)
        if (mag > 0) {
            spell.vx = dx * 45 / mag
            spell.vy = dy * 45 / mag
        }
    }
})

info.onLifeZero(function () {
    game.splash("CHARIZARD GOT CAPTURED!", "TRY THE ESCAPE AGAIN.")
    game.over(false)
})

game.splash("CHARIZARD:", "BACKYARD ESCAPE")
game.showLongText("Charizard has somehow landed in Harry Potter's backyard. The only reasonable response is to escape immediately and locate Mario's favorite pizza parlor.", DialogLayout.Full)
startBackyard()

