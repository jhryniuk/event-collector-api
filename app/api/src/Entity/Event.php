<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['event:read']],
    denormalizationContext: ['groups' => ['event:write']]
)]
class Event
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    #[Groups('event:read')]
    private ?int $id = null;
    #[ORM\Column]
    #[Groups(['event:read', 'event:write'])]
    private ?string $name = null;
    #[ORM\Column]
    #[Groups(['event:read', 'event:write'])]
    private ?\DateTime $startDateTime = null;
    #[ORM\Column]
    #[Groups(['event:read', 'event:write'])]
    private ?\DateTime $endDateTime = null;
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'eventsOwner')]
    #[ORM\JoinColumn(name: 'owner_id', referencedColumnName: 'id')]
    #[ApiProperty]
    #[Groups(['event:read', 'event:write'])]
    private User $owner;
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'assignedToEvents')]
    #[ORM\JoinTable(name: 'event_participant')]
    #[ApiProperty]
    #[Groups(['event:read', 'event:write'])]
    private Collection $participants;
    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['event:read', 'event:write'])]
    private ?string $description = null;
    #[ORM\Column]
    #[Groups(['event:read'])]
    private ?\DateTime $createdAt = null;
    #[ORM\Column]
    #[Groups(['event:read'])]
    private ?\DateTime $updatedAt = null;



    public function __construct()
    {
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
    public function getStartDateTime(): ?\DateTime
    {
        return $this->startDateTime;
    }

    /**
     * @param \DateTime|null $dateTime
     */
    public function setStartDateTime(?\DateTime $dateTime): void
    {
        $this->startDateTime = $dateTime;
    }

    /**
     * @return \DateTime|null
     */
    public function getEndDateTime(): ?\DateTime
    {
        return $this->endDateTime;
    }

    /**
     * @param \DateTime|null $dateTime
     */
    public function setEndDateTime(?\DateTime $dateTime): void
    {
        $this->endDateTime = $dateTime;
    }

    /**
     * @return User
     */
    public function getOwner(): User
    {
        return $this->owner;
    }

    /**
     * @param User $owner
     */
    public function setOwner(User $owner): void
    {
        $this->owner = $owner;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getUpdatedAt(): ?\DateTime
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTime $updatedAt): void
    {
        $this->updatedAt = $updatedAt;
    }
}