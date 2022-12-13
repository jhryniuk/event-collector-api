<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
class Event
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;
    #[ORM\Column]
    private ?string $name = null;
    #[ORM\Column]
    private ?\DateTime $dateTime = null;
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'eventsOwner')]
    #[ORM\JoinTable(name: 'event_owner')]
    #[ApiProperty]
    private Collection $owners;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'assignedToEvents')]
    #[ORM\JoinTable(name: 'event_participant')]
    #[ApiProperty]
    private Collection $participants;

    public function __construct()
    {
        $this->owners = new ArrayCollection();
        $this->participants = new ArrayCollection();
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string|null $name
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return \DateTime|null
     */
    public function getDateTime(): ?\DateTime
    {
        return $this->dateTime;
    }

    /**
     * @param \DateTime|null $dateTime
     */
    public function setDateTime(?\DateTime $dateTime): void
    {
        $this->dateTime = $dateTime;
    }

    /**
     * @return Collection
     */
    public function getOwners(): Collection
    {
        return $this->owners;
    }

    /**
     * @param array $owners
     */
    public function setOwners(array $owners): void
    {
        $this->owners->clear();
        foreach ($owners as $owner) {
            if (!$this->owners->contains($owner)) {
                $this->owners->add($owner);
            }
        }
    }

    public function addOwner(User $user): void
    {
        if (!$this->owners->contains($user)) {
            $this->owners->add($user);
        }
    }

    public function removeOwner(User $user): void
    {
        if ($this->owners->contains($user)) {
            $this->owners->removeElement($user);
        }
    }

    /**
     * @return Collection
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    /**
     * @param $participants[]
     */
    public function setParticipants(array $participants): void
    {
        $this->participants->clear();
        foreach ($participants as $participant) {
            if (!$this->participants->contains($participant)) {
                $this->participants->add($participant);
            }
        }
    }

    public function addParticipant(User $user): void
    {
        if (!$this->participants->contains($user)) {
            $this->participants->add($user);
        }
    }

    public function removeParticipant(User $user): void
    {
        if ($this->participants->contains($user)) {
            $this->participants->removeElement($user);
        }
    }
}