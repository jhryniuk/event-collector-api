<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']],
    security: "is_granted('ROLE_USER')"
)]
#[GetCollection]
#[Get(security: "is_granted('USER_READ', object)")]
#[Post]
#[Put(security: "is_granted('USER_EDIT', object)")]
#[Patch(security: "is_granted('USER_EDIT', object)")]
#[Delete(security: "is_granted('USER_DELETE', object)")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    #[Groups(['user:read', 'user:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['user:read', 'user:write'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['user:read', 'user:write'])]
    private array $roles = [];
    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Event::class)]
    #[ApiProperty]
    #[Groups(['user:read', 'user:write'])]
    private Collection $eventsOwner;

    #[ORM\ManyToMany(targetEntity: Event::class, mappedBy: 'participants')]
    #[ApiProperty]
    #[Groups(['user:read', 'user:write'])]
    private Collection $assignedToEvents;

    /**
     * @var string|null $password The password
     */
    #[ORM\Column]
    #[Groups('user:write')]
    private ?string $password = null;

    #[ORM\OneToOne(targetEntity: Image::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty]
    #[Groups(['user:read', 'user:write'])]
    private ?Image $image = null;

    public function __construct()
    {
        $this->eventsOwner = new ArrayCollection();
        $this->assignedToEvents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getEventsOwner(): Collection
    {
        return $this->eventsOwner;
    }

    /**
     * @param array $events
     */
    public function setEventsOwner(array $events): void
    {
        $this->eventsOwner = $events;
    }

    /**
     * @return Collection
     */
    public function getAssignedToEvents(): Collection
    {
        return $this->assignedToEvents;
    }

    /**
     * @param array $events
     */
    public function setAssignedToEvents(array $events): void
    {
        /** @var Event $event */
        foreach ($this->assignedToEvents as $event) {
            $event->removeParticipant($this);
        }
        /** @var Event $event */
        foreach ($events as $event) {
            $event->addParticipant($this);
        }
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(Image $image): void
    {
        $this->image = $image;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
    }
}
