const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members.js');


// This route gets all members
router.get('/', (req, res) => {
  res.json(members);
});

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  }
  else{
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
  }
});

// Create a member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'Active'
  }

  if(!newMember.name || !newMember.email){
    res.status(400).json({msg: 'Please include a name and an email'});
  }
  else{
    members.push(newMember);
    res.status(200).json(members);
    // res.redirect('/')
  }
});

// Update member
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found){
    const updateMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)){
        member.name =  updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({msg: 'Member information is updated.', member});
      }
    });
  }
  else{
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
  }
});

// Delete Member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found){
    res.json({msg: 'Member deleted',members: members.filter(member => member.id !== parseInt(req.params.id))});
  }
  else{
    res.status(400).json({msg: `No member with the id of ${req.params.id}`});
  }
});

module.exports = router;
