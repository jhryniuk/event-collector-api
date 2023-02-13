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
            'roles' => $this->user->getRoles(),
            'identifier' => $this->user->getUserIdentifier(),
            'image' => $this->user->getImage()?->getId(),
        ];
    }

    public function toObject()
    {
        return $this->user;
    }
}
