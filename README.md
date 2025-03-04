# Terraria housing app

This project was created using [Create React App](https://github.com/facebook/create-react-app).

This isn't serious project. \
But it was created just because I wanted to try myself \
in developing such beautiful interfaces to calculate something we playing with friends

### How to use it

Just run `npm install` and then `npm start`
Then it will run development server for you

In upper list you'll find any available NPC to settle

Under this list you can find `+` button.
You can Add biomes where you want to settle your NPCs

Then you can drag and drop NPCs to settle them to discrete groups
Under each NPC you'll find their bonus (the higher bonus - the better result)
In the bottom of each group You can find overall group bonus
This bonus is sum of each NPC bonus
Right to bonus You'll find remove button, which will remove group \
and unsettle every NPC in this group

In the bottom of the page you'll find overall bonus \
that is sum of bonuses of every group you have

After all in the most bottom part you'll find \
`Save` and `Load` buttons.
These buttons needed to save and load current groups to json.

### Saved JSON format

Each saved JSON should consist of `Array` of groups
Each group is Object with key `biome` and value as `string`
Also these groups should have key `npc` with value of `Array` \
of either objects that has key `name` and `string` value or just `string`s