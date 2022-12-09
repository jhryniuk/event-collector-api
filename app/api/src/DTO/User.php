<?php

namespace App\DTO;

class User
{
    private $user;
    public function __construct(\App\Entity\User $user)
    {
        $this->user = $user;
    }

    public function toArray()
    {
        return [
            'id' => $this->user->getId(),
            'email' => $this->user->getEmail(),
            'password' => $this->user->getPassword(),
            'roles' => $this->user->getRoles(),
            'identifier' => $this->user->getUserIdentifier()
        ];
    }

    public function toObject()
    {
        return $this->user;
    }
}